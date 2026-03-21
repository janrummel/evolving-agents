-- Phase 1: Skill Performance Schema for OpenClaw
-- Target: ~/.openclaw/data/metrics.db
-- Usage: sqlite3 ~/.openclaw/data/metrics.db < schema.sql

CREATE TABLE IF NOT EXISTS skill_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    agent_id TEXT NOT NULL DEFAULT 'main',
    skill_name TEXT NOT NULL,
    task_type TEXT,
    quality_score REAL,
    token_cost INTEGER,
    duration_seconds REAL,
    outcome TEXT CHECK(outcome IN ('success', 'partial', 'failure', 'skipped')),
    project TEXT,
    notes TEXT
);

CREATE VIEW IF NOT EXISTS skill_metrics AS
SELECT
    skill_name,
    COUNT(*) as total_uses,
    ROUND(AVG(quality_score), 3) as avg_quality,
    ROUND(AVG(token_cost), 0) as avg_cost,
    ROUND(AVG(duration_seconds), 1) as avg_duration,
    ROUND(SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 3) as success_rate,
    MIN(timestamp) as first_used,
    MAX(timestamp) as last_used
FROM skill_performance
GROUP BY skill_name;

CREATE VIEW IF NOT EXISTS skill_pareto AS
SELECT
    skill_name,
    avg_quality,
    avg_cost,
    total_uses,
    CASE
        WHEN avg_quality > (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost < (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'PARETO-OPTIMAL'
        WHEN avg_quality < (SELECT AVG(avg_quality) FROM skill_metrics)
         AND avg_cost > (SELECT AVG(avg_cost) FROM skill_metrics)
        THEN 'DOMINATED'
        ELSE 'TRADE-OFF'
    END as pareto_status
FROM skill_metrics
WHERE total_uses >= 3;

CREATE VIEW IF NOT EXISTS agent_skill_metrics AS
SELECT
    agent_id,
    skill_name,
    COUNT(*) as uses,
    ROUND(AVG(quality_score), 3) as avg_quality,
    ROUND(AVG(token_cost), 0) as avg_cost,
    ROUND(SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*), 3) as success_rate
FROM skill_performance
GROUP BY agent_id, skill_name;
