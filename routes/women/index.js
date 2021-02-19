var express = require('express');
var fs = require('fs');
var router = express.Router();

const matches = JSON.parse(fs.readFileSync('routes/women/matches.json'));
const teams = JSON.parse(fs.readFileSync('routes/women/teams.json'));
const results = JSON.parse(fs.readFileSync('routes/women/results.json'));
const group_results = JSON.parse(fs.readFileSync('routes/women/group_results.json'));

// All match data
router.get('/matches', function(req, res) {
    res.json(matches);
});

// Matches for any country, by entering their FIFA Code
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

// List of all teams in world cup, along with FIFA abbreviation
router.get('/teams', function(req, res) {
    res.json(teams);
});

// Results for teams (wins, losses, draws, goals_for, goals_against)
router.get('/teams/results', function(req, res) {
    res.json(results);
});

// Results for teams by group, ordered by current group position
router.get('/teams/group_results', function(req, res) {
    res.json(group_results);
});

module.exports = router;