const removeUnderscore = (data) => data.map((tasks) => {
  const {
    _id, task, date, status,
  } = tasks;
  return {
    id: _id,
    task,
    date,
    status,
  };
});

export default removeUnderscore;
