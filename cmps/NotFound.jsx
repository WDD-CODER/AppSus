
export function NotFound() {

  return (
    <section className="not-found container">
      <div >
        <h1>404 Page Not Found </h1>
        <p>This page doesn't exist in this app</p>
        <a style={{color:'blue' ,textDecoration:'underline'}} href="/#/">Go back to the homePage</a>
      </div>
    </section>
  );
}