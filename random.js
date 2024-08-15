const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}

app.get('/user/:id', logMiddleware, (req, res) => {
  // :idをreq.params.idとして受け取る
  res.status(200).send(req.params.id);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

async function main() {
  await client.connect();

  const db = client.db('my-app');

  app.get('/', logMiddleware, async (req, res) => {
    const users = await db.collection('user').find().toArray();
    const names = users.map((user) => {
      return user.name;
    });

    res.render(path.resolve(__dirname, 'views/random.ejs'), { users: names });
  });

  app.post('/api/user', express.json(), async (req, res) => {
    const name = req.body.name;
    if (!name) {
      res.status(400).send('Bad Request');
      return;
    }
    await db.collection('user').insertOne({ name: name });
    res.status(200).send('Created');
  });

  // 新しく追加するエンドポイント
  app.get('/api/random', async (req, res) => {
    const users = await db.collection('user').find().toArray();
    if (users.length === 0) {
      return res.status(404).send('No users found');
    }
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex].name;
    res.json({ user: randomUser });
  });

  // ポート: 3000でサーバーを起動
  app.listen(3000, () => {
    // サーバー起動後に呼び出されるCallback
    console.log('start listening');
  });
}
main();
