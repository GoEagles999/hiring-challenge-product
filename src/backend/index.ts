import express from 'express';
import multer from 'multer';
import { eq, lt, gte, ne, sql } from 'drizzle-orm';
import cors from 'cors';
import { db } from './db';
import { pdf } from './schema';
import { Blob } from 'buffer';

import fetch from 'node-fetch';
import 'dotenv/config';
import bodyParser from 'body-parser';
const upload = multer({});
const app = express();
app.use(cors());
app.use(bodyParser.json());

const router = express.Router();

app.get('/documents', async (req, res) => {
  if (req.query.status == 'processed') {
    const result = await db
      .select()
      .from(pdf)
      .where(eq(pdf.status, 'processed'));
    res.json({ data: result });
  }
  if (req.query.status == 'pending') {
    const result = await db
      .select()
      .from(pdf)
      .where(sql`${pdf.status} = 'pending' or ${pdf.status} = 'uploading'`);
    res.json({ data: result });
  }
});

app.get('/documents/:id', async (req, res) => {
  const result = await db
    .select()
    .from(pdf)
    .where(eq(pdf.id, Number(req.params.id)));
  res.json({ data: result[0] });
});
app.patch('/documents/:id', async (req, res) => {
  console.log(req.body);
  const { kind, name, author } = req.body;
  await db
    .update(pdf)
    .set({ kind, name, author })
    .where(eq(pdf.id, Number(req.params.id)));
  res.json(null);
});
app.get('/documents/:id/resource', async (req, res) => {
  const result = await db
    .select()
    .from(pdf)
    .where(eq(pdf.id, Number(req.params.id)));
  const data = result[0].data;
  console.log(data);
  res.send(data);
});
app.post('/documents', upload.array('pdf'), async (req, res) => {
  //Updates the document's metadata, and triggers a call to the PROCESSING_API_ENDPOINT endpoint.
  console.log(req.files);
  const { author, kind } = req.body;
  const rowids = [];
  for (const file of req.files) {
    const r = await db.insert(pdf).values({
      name: 'asd',
      author,
      kind,
      status: 'uploading',
      uploadedAt: Number(Date.now()),
    });
    rowids.push(r.lastInsertRowid);
  }
  res.json(null);
  for (let i = 0; i < req.files.length; i++) {
    const u = await db
      .update(pdf)
      .set({
        data: req.files[i].buffer,
        status: 'pending',
      })
      .where(eq(pdf.id, Number(rowids[i])));
    console.log(u);
    /*
    const response = await fetch(process.env.PROCESSING_API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({id:r.id}),
    });
    const data = await response.json();
    */
  }

  console.log('asd');
});

app.post('/documents/:id/complete', async (req, res) => {
  await db
    .update(pdf)
    .set({ status: 'processed', processedAt: Number(Date.now()) })
    .where(eq(pdf.id, Number(req.params.id)));
  res.status(200);
});
app.delete('/documents/:id', async (req, res) => {
  const result = await db
    .delete(pdf)
    .where(eq(pdf.id, Number(req.params.id)))
    .returning();
  res.json(null);
});

console.log('Listening on port 4500');
app.listen(4500);
