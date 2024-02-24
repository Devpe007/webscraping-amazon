import { app } from ".";

// Roda a api na porta em que se passar no dotenv ou, caso não passe, rodará na porta 9000;
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
