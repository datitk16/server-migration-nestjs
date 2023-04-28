export const EmployeeHtml = `<!DOCTYPE html>
<html>
<head>
  <title>My Online CV</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: 0.5em;
    }
    a {
      color: #337ab7;
    }
  </style>
</head>
<body>
  <header>
    <h1 style="text-transform: capitalize"><%-name %></h1>
    <p>Email:  <%-email %> | Phone: <%-phoneNumber %></p>
  </header>
  <main>
    <h2>Summary</h2>
    <p><%-summary %></p>

    <h2>Skills</h2>
    <ul>
     <% if (skills.length > 0){ %>
      <ul>
        <% skills.forEach(function(skill) { %>
        <li style="text-transform: capitalize"><%= skill.name %></li>
          <% }); %>
      </ul>
      <% } %>
    </ul>

    <h2>Experience</h2>
    <ul>
      <li>
        <h3>Software Engineer</h3>
        <p>ABC Company | Jan 2018 - Present</p>
        <ul>
          <li>Developed and maintained a large-scale e-commerce platform using React and Node.js.</li>
          <li>Implemented various features such as user authentication, payment processing, and product search.</li>
          <li>Optimized the website performance by reducing the page load time by 50%.</li>
        </ul>
      </li>
      <li>
        <h3>Web Developer</h3>
        <p>XYZ Agency | Sep 2015 - Dec 2017</p>
        <ul>
          <li>Designed and developed responsive websites for various clients using HTML, CSS, and JavaScript.</li>
          <li>Collaborated with designers and project managers to deliver high-quality products on time and within budget.</li>
          <li>Provided ongoing maintenance and support for the websites.</li>
        </ul>
      </li>
    </ul>

    <h2>Education</h2>
    <ul>
      <li>
        <h3>Bachelor of Science in Computer Science</h3>
        <p>University of XYZ | Sep 2011 - May 2015</p>
      </li>
    </ul>
  </main>

  <footer>
    <p>&copy; 2023 John Doe</p>
  </footer>
</body>
</html>
`;
