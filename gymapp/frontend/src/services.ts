const local = "https://localhost:4000/";
const staging = "";
const production = "";
const custom = "change to custom localhost";

export function getApiUrl(url: string): string {
  const env = import.meta.env.MODE;

  switch (env) {
    case "development":
      return local + url;
    case "staging":
      return staging + url;
    case "production":
      return production + url;
    case "custom":
      return custom + url;
  }
  return "";
}
