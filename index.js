const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const PORT = process.env.PORT || 3000;

// Connexion à Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Route principale
app.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('test')
    .select('*');

  if (error) {
    return res.send("Erreur: " + error.message);
  }

  res.json(data);
});

// Santé
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
