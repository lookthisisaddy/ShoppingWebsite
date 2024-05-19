const app = require("./app");
const PORT = process.env.PORT

app.listen(PORT, (error) => {
    if (!error) console.log(`Server start at port no ${PORT}`);
    else console.log("Error : ", error);
});
