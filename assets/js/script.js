document.addEventListener("DOMContentLoaded", async () => {

    const components = [
        "header",
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "contact"
    ];

    for (const component of components) {
        const container = document.getElementById(component);

        if (!container) continue;

        try {
            const response = await fetch(`components/${component}.html`);

            if (!response.ok) {
                throw new Error(
                    `Gagal memuat components/${component}.html`
                );
            }

            container.innerHTML = await response.text();

        } catch (error) {
            console.error(error);
        }
    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen = menuButton.classList.toggle("open");

            navigation.classList.toggle("open");
            document.body.classList.toggle("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Tutup menu setelah klik link */

        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("open");
                navigation.classList.remove("open");
                document.body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* =========================================
           ACTIVE NAVIGATION
        ========================================= */

        const sections = document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");

                        navLinks.forEach((link) => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

    }

});