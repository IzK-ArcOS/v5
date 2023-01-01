export async function testConnection(server: string) {
  try {
    const req = await (await fetch(`http://${server}:3333/connect`)).json();

    return req && !!req.valid;
  } catch {
    return false;
  }
}
