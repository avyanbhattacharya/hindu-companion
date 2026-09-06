const input = document.getElementById("input");
const output = document.getElementById("output");
const save = document.getElementById("save");

const DATA_KEY = "hindu-companion:data";

const savedData = Storage.get(DATA_KEY, "Nothing saved yet");
output.textContent = savedData;
if (savedData !== "Nothing saved yet") {
  input.value = savedData;
}

save.onclick = () => {
  const value = input.value.trim();
  if (value) {
    Storage.set(DATA_KEY, value);
    output.textContent = value;
  } else {
    Storage.remove(DATA_KEY);
    output.textContent = "Nothing saved yet";
  }
};
