export default async function handler(req, res) {
  const { method, body } = req;
  console.log("Creating new campaign");
  console.log(method, body);
}
