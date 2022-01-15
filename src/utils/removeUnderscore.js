const removeUnderscore = (data) => data.map((task) => {
  const {
    _id, task, date, status,
  } = task;
  return {
    id: _id,
    task,
    date,
    status,
  };
});

export default removeUnderscore;
