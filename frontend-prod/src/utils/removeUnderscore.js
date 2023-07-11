const removeUnderscore = (data) => data.map((task) => {
  const {
    _id, text, date, status,
  } = task;
  return {
    id: _id,
    text,
    date,
    status,
  };
});

export default removeUnderscore;
