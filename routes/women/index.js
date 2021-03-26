const express = require('express');
const fs = require('fs');
const router = express.Router();

const matches = JSON.parse(fs.readFileSync('routes/women/matches.json'));
const teams = JSON.parse(fs.readFileSync('routes/women/teams.json'));
const results = JSON.parse(fs.readFileSync('routes/women/results.json'));
const group_results = JSON.parse(fs.readFileSync('routes/women/group_results.json'));

/**
 * @api [get] /women/matches
 * summary: "Get all match data"
 * tags: 
 * - "Women"
 */
router.get('/matches', function(req, res) {
    res.json(matches);
});

/**
 * @api [get] /women/matches/country
 * summary: "Get matches for any country, by entering their FIFA Code"
 * parameters:
 * - name: "fifa_code"
 *   in: "query"
 *   description: "Filter matches by FIFA Code"
 *   required: true
 *   type: "string"
 * tags: 
 * - "Women"
 */
router.get('/matches/country', function(req, res) {
    const { fifa_code } = req.query;
    if (!fifa_code) {
        res.status(400).json({ error: 'Bad request. Include country fifa code!' });
        return;
    }

    const result = matches.filter(match => (match.home_team.code === fifa_code || match.away_team.code === fifa_code));
    if (!result.length) {
        res.status(400).json({ error: 'Bad request. Include the existing country fifa code!' });
        return;
    }

    res.json(result);
});

/**
 * @api [get] /women/teams
 * summary: "Get list of all teams in world cup, along with FIFA abbreviation"
 * tags: 
 * - "Women"
 */
router.get('/teams', function(req, res) {
    res.json(teams);
});

/**
 * @api [get] /women/teams/results
 * summary: "Get results for teams (wins, losses, draws, goals_for, goals_against)"
 * tags: 
 * - "Women"
 */
router.get('/teams/results', function(req, res) {
    res.json(results);
});

/**
 * @api [get] /women/teams/group_results
 * summary: "Get results for teams by group, ordered by current group position"
 * tags: 
 * - "Women"
 */
router.get('/teams/group_results', function(req, res) {
    res.json(group_results);
});

module.exports = router;