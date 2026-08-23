import Link from "next/link";

const Unauthorized = () => {
  return <main><h1>401 Unauthorized</h1><p><Link href="/login">Authorize, please.</Link></p></main>;
};

export default Unauthorized;