const removeUnderscore = (data) => data.map((task) => {
  const {
    _id, name, date, status,
  } = task;
  return {
    id: _id,
    name,
    date,
    status,
  };
});

export default removeUnderscore;
