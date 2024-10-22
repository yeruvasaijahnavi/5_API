interface ContactFormData {
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
}

const getInputValue = (id: string): string =>
    (document.getElementById(id) as HTMLInputElement)?.value || "";

const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateContact = (contact: string): boolean => /^\d{10}$/.test(contact);

const validateFormData = (formData: ContactFormData): string | null => {
    if (
        !formData.name ||
        !formData.email ||
        !formData.contact ||
        !formData.subject ||
        !formData.message
    ) {
        return "All fields are required.";
    }
    if (!validateEmail(formData.email)) {
        return "Please enter a valid email address.";
    }
    if (!validateContact(formData.contact)) {
        return "Please enter a valid 10-digit contact number.";
    }
    if (formData.name.length > 50) {
        return "Name must be 50 characters or less.";
    }
    if (formData.message.length > 500) {
        return "Message must be 500 characters or less.";
    }
    return null; // All validations passed
};

document
    .getElementById("contactForm")
    ?.addEventListener("submit", async function (event: Event) {
        event.preventDefault(); // Prevents the default form submission

        // Collect form data
        const formData: ContactFormData = {
            name: getInputValue("name"),
            email: getInputValue("email"),
            contact: getInputValue("contact"),
            subject: getInputValue("subject"),
            message:
                (document.getElementById("message") as HTMLTextAreaElement)
                    ?.value || "",
        };

        // Validate form data
        const validationError = validateFormData(formData);
        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            // Send POST request to MockAPI
            const response = await fetch(
                "https://671649ac33bc2bfe40bd4602.mockapi.io/api/contacts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify content type
                    },
                    body: JSON.stringify(formData), // Convert form data to JSON
                }
            );

            // Handle the API response
            if (response.ok) {
                const jsonResponse = await response.json();
                alert(
                    "Form submitted successfully! Submission ID: " +
                        jsonResponse.id
                );
            } else {
                alert("Failed to submit the form");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form");
        }
    });
