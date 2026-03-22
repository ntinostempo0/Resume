function getStars(rating) {
    const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
    let stars = "";
    for (let i = 0; i < 5; i++) {
        if (i < safeRating) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

function renderStarRatings(root = document) {
    root.querySelectorAll(".star-rating").forEach((el) => {
        const rating = Number(el.dataset.rating) || 0;
        el.innerHTML = getStars(rating);
    });
}

class SkillsTemplate extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute("name") || this.getAttribute("var1") || "";
        const rating = this.getAttribute("rating") || this.getAttribute("var2") || "0";

        this.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${name}</span>
                <span class="text-primary star-rating" data-rating="${rating}"></span>
            </div>
        `;

        renderStarRatings(this);
    }
}

if (!customElements.get("skills-template")) {
    customElements.define("skills-template", SkillsTemplate);
}

class SertificationsTemplate extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute("name") || this.getAttribute("var1") || "";
        const issuer = this.getAttribute("issuer") || this.getAttribute("var2") || "";
        const date = this.getAttribute("date") || this.getAttribute("var3") || "";

        const openFile = this.getAttribute("openFile") || this.getAttribute("var4") || "";

        this.innerHTML = `
            <div class="d-flex flex-column h-100">
                <div class="fw-bold mb-2">${name} <a href="${openFile}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right"></i></a>
                </div>
                <div class="mt-auto">
                    <div class="text-secondary fw-semibold">${date}</div>

                    <p class="mb-1">Issued by ${issuer}.</p>
                    
                </div>
            </div>
        `;
    }
}

if (!customElements.get("sertifications-template")) {
    customElements.define("sertifications-template", SertificationsTemplate);
}

// Render any static star-rating nodes already present in the page.
renderStarRatings(document);