// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Get the form and resume output div
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement | null;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement | null;
    const shareableLink = document.getElementById('shareableLink') as HTMLDivElement | null;

    // Listen for form submission
    resumeForm?.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values from the form
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        const educationInput = document.getElementById('education') as HTMLTextAreaElement;
        const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
        const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

        // Get values from inputs
        const name = nameInput?.value || '';
        const email = emailInput?.value || '';
        const phone = phoneInput?.value || '';
        const education = educationInput?.value || '';
        const experience = experienceInput?.value || '';
        const skills = skillsInput?.value || '';
        
        // Get the profile picture file (if any)
        const profilePictureFile = profilePictureInput?.files ? profilePictureInput.files[0] : null;
        
        // Convert profile picture to Base64 if available
        let profilePictureBase64 = '';
        if (profilePictureFile) {
            profilePictureBase64 = await convertToBase64(profilePictureFile);
        }

        // Create unique path based on the username (replace spaces with underscores)
        const username = name.replace(/\s+/g, '_');
        const uniquePath = `resumes/${username}_resume.html`;

        // Create resume content as an HTML string
        let resumeContent = `
            <h2>${name}'s Resume</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        // If a profile picture is provided, add it at the top of the resume
        if (profilePictureBase64) {
            resumeContent = `
                <img src="${profilePictureBase64}" alt="Profile Picture" style="width:150px; height:auto; border-radius:50%; margin-bottom:20px;">
                ${resumeContent}
            `;
        }

        // Display the generated resume in the resumeOutput div
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
        }

        // Generate the shareable download link
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeContent);
        downloadLink.download = `${username}_resume.html`;
        downloadLink.textContent = "Download Your Resume";

        // Display the shareable download link
        if (shareableLink) {
            shareableLink.innerHTML = "<p>Click below to download or share your resume:</p>";
            shareableLink.appendChild(downloadLink);
        }
    });

    // Function to convert a file to a Base64 string
    function convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
});
