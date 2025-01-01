export const TAB_DATA = [
    {
      title: "Skills",
      id: "skills",
      content: (
        <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3 md:text-base">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-sky-500">Frontend Development</h3>
            <ul className="pl-5 space-y-2 list-disc">
              <li>React.js</li>
              <li>Next.js</li>
              <li>Redux</li>
              <li>Vue.js</li>
              <li>Nuxt.js</li>
              <li>Pinia</li>
              <li>CSS3</li>
              <li>Tailwind CSS</li>
              <li>Axios</li>
              <li>Tanstack</li>
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
            </ul>
          </div>
  
          <div>
            <h3 className="mb-4 text-xl font-semibold text-sky-500">Backend Development</h3>
            <ul className="pl-5 space-y-2 list-disc">
              <li>C#</li>
              <li>.NET core</li>
              <li>ASP.NET</li>
              <li>Entity Framework</li>
              <li>PostgreSQL</li>
              <li>MVC</li>
              <li>RESTful API</li>
              <li>Controller Based API</li>
              <li>SQL</li>
              <li>Microservices</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-semibold text-sky-500">Artificial Intelligence</h3>
            <ul className="pl-5 space-y-2 list-disc">
              <li>Machine Learning</li>
              <li>Neural Networks</li>
              <li>Computer Vision</li>
              <li>Natural Language Processing (NLP)</li>
              <li>Data Analysis</li>
              <li>Data Visualization</li>
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Expert Systems</li>
            </ul>
          </div>
  
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <ul className="pl-2">
          <li className="list-disc">
            Arab International University, Syria
          </li>
          <p className="text-xs font-thin tracking-wide text-gray-400">
            Bachelor of Information Engineering, Artificial Intelligence
          </p>
        </ul>
      ),
    },
  ];
  