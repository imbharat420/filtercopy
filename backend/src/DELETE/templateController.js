import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';

import Template from '../models/template-model.js';

export const CreateTemaplate = asyncHandler(async (req, res) => {
  const template = await new Template({
    user: req.user,
    template: uuidv4(),
  });
  await template.validate();
  await template.save();
  res.ok(template);
});
export const GetTemaplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const template = await Template.findById(id);

  if (!template) {
    res.badRequest({ error: 'NO Template found' });
  }
  res.ok(template);
});
export const UpdateTemaplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const template = await Template.findById(id);
  if (!template) {
    res.badRequest({ error: 'NO Template found' });
  }

  // await Template.findByIdAndUpdate();

  template.res.ok(template);
});

export const DeleteTemaplate = asyncHandler(async (req, res) => {
  try {
    await Template.findByIdAndRemove(req.params.id);
    res.json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
