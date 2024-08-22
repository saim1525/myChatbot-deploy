// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


const ruleBasedModel = (caseDetails) => {
    const rules = [
      { keywords: ['murder', 'kill', 'homicide'], articles: ['Article 302: Murder'] },
      { keywords: ['theft', 'steal', 'robbery'], articles: ['Article 379: Theft', 'Article 390: Robbery'] },
      { keywords: ['fraud', 'cheat', 'scam'], articles: ['Article 420: Fraud', 'Article 421: Forgery'] },
      { keywords: ['assault', 'attack', 'battery'], articles: ['Article 324: Assault', 'Article 345: Battery'] },
      { keywords: ['rape', 'sexual assault'], articles: ['Article 376: Rape'] },
      { keywords: ['kidnapping', 'abduction'], articles: ['Article 361: Kidnapping', 'Article 362: Abduction'] },
      { keywords: ['bribery', 'corruption'], articles: ['Article 171: Bribery', 'Article 168: Corruption'] },
      { keywords: ['cybercrime', 'hacking', 'identity theft'], articles: ['Article 66: IT Act - Cybercrime', 'Article 66C: Identity Theft'] },
      { keywords: ['domestic violence', 'spousal abuse'], articles: ['Article 498A: Domestic Violence'] },
      { keywords: ['property dispute', 'land dispute'], articles: ['Article 34: Property Dispute'] },
      
    ];
    const matchedArticles = new Set();
    const lowerCaseDetails = caseDetails.toLowerCase();
    rules.forEach((rule) => {
      rule.keywords.forEach((keyword) => {
        if (lowerCaseDetails.includes(keyword)) {
          rule.articles.forEach((article) => {
            matchedArticles.add(article);
          });
        }
      });
    });
    if (matchedArticles.size === 0) {
      matchedArticles.add('No specific articles found. Further legal consultation might be required.');
    }
    return Array.from(matchedArticles);
  };


app.post('/api/chatbot', (req, res) => {
  const { caseDetails } = req.body;
  const summary = `Summary of the case: ${caseDetails.substring(0, 100)}...`;
  const articles = ruleBasedModel(caseDetails);

  res.json({ summary, articles });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));