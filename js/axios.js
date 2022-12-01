getData = async () => {
  let data = [];
  await axios
    .get(
      "https://script.google.com/macros/s/AKfycbypgcLExO0lIcuPFho5UlkIitvCo4BpMUDRT-Fx0PDZGsyQNJWmkyE_ZWoOiyIM0xrneg/exec"
    )
    .then((response) => (data = response.data))
    .catch((error) => console.log(error));
  for (let i = 1; i < data.content.length; i++) {
    const date = new Date(`${data.content[i][0]}`).getUTCDate();
    const hour = new Date(`${data.content[i][1]}`).getUTCHours();
  }
};

postData = async (form) => {
  await axios
    .post(
      "https://script.google.com/macros/s/AKfycbyOkoJiRwJR_99UQEVlQnjoKpo8AoRhG-zdD_C4Q8NuzIB_BqdZUEk5mxcpG4JZGI2FjA/exec",
      new FormData(form)
    )
    .then()
    .catch((error) => console.log(error));
};

exportData = () => {
  const form = document.forms["submit-to-google-sheet"];
  postData(form);
};

showData = async () => {
  const response = await getData();
};

mySubmitFunction = (e) => {
  e.preventDefault();
  return false;
};

window.onload = () => {
  showData();
};
