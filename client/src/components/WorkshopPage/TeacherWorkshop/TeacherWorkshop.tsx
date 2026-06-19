import "./TeacherWorkshop.css";

function TeacherWorkshop() {
  const teachers = [
    {
      initials: "LR",
      specialityClass: "ceramique",
      name: "Lucie Rambaud",
      speciality: "Céramique & Terres",
      description:
        "Céramiste professionnelle depuis 12 ans, ancienne de l'École de Limoges. Atelier propre à Montauban.",
      workshopCount: 8,
    },
    {
      initials: "TC",
      specialityClass: "numerique",
      name: "Thomas Curet",
      speciality: "Numérique & Code",
      description:
        "Développeur freelance spécialisé Python & automatisation. Pédagogie par le projet, pas la théorie.",
      workshopCount: 12,
    },
    {
      initials: "ML",
      specialityClass: "photographie",
      name: "Marie Lassalle",
      speciality: "Photographie",
      description:
        "Photographe de reportage, formatrice AFPA. Spécialiste portrait et paysage industriel.",
      workshopCount: 6,
    },
    {
      initials: "CR",
      specialityClass: "artisanat",
      name: "Camille Roux",
      speciality: "Artisanat textile",
      description:
        "Artiste textile, sérigraphiste indépendante. Collabore avec des marques locales sur leur édition limitée.",
      workshopCount: 9,
    },
  ];

  return (
    <section className="Teacher-Workshop-Global-Section">
      <h1 className="Title-Teacher-Section-Workshop">NOS FORMATEUR</h1>
      <div className="Teacher-Global-Div-Card">
        <div className="Teacher-Section">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className={`Teacher-Card ${teacher.specialityClass}`}
            >
              <div className="test">
                <div className="Teacher-Avatar-Teacher-WorkshopPage">
                  <span>{teacher.initials}</span>
                </div>
                <div className="Teacher-Info-WorkshopPage">
                  <p className="Teacher-Name">{teacher.name}</p>
                  <p className="Teacher-Speciality">{teacher.speciality}</p>
                  <p className="Teacher-Description">{teacher.description}</p>
                  <p className="Teacher-Count">
                    <em className="WorkshopCountNumber">
                      {teacher.workshopCount}
                    </em>{" "}
                    ateliers animés
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeacherWorkshop;
