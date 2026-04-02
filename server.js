const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'xr3b-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 604800000 } // 7 days
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Discord OAuth Strategy
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/api/auth/callback',
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    return done(null, profile);
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Auth Routes
app.get('/api/auth/discord', passport.authenticate('discord'));

app.get('/api/auth/callback', 
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Get User Info
app.get('/api/user', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({
        id: req.user.id,
        username: req.user.username,
        discriminator: req.user.discriminator,
        avatar: req.user.avatar
    });
});

// Get User Guilds
app.get('/api/guilds', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${req.user.accessToken}`
            }
        });
        const guilds = await response.json();
        
        // Filter guilds where user has MANAGE_GUILD permission
        const managedGuilds = guilds.filter(guild => 
            (guild.permissions & 0x20) === 0x20 || guild.owner
        );
        
        res.json(managedGuilds);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch guilds' });
    }
});

// Get Guild Settings
app.get('/api/guild/:guildId/settings', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { guildId } = req.params;
    
    // TODO: Fetch from database
    // This is a mock response
    res.json({
        prefix: '/',
        welcomeEnabled: true,
        aiEnabled: true,
        protectionEnabled: false,
        giveawaysEnabled: false,
        logChannel: null,
        supportRole: null
    });
});

// Update Guild Settings
app.post('/api/guild/:guildId/settings', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { guildId } = req.params;
    const settings = req.body;
    
    // TODO: Save to database and update bot
    console.log('Updating guild settings:', guildId, settings);
    
    res.json({ success: true, settings });
});

// Get Guild Stats
app.get('/api/guild/:guildId/stats', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { guildId } = req.params;
    
    // TODO: Fetch real stats from bot
    res.json({
        totalMembers: 1234,
        activeMembers: 856,
        messagesToday: 15234,
        activeCommands: 42
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Dashboard running on http://localhost:${PORT}`);
});
