document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const shareableLink = document.getElementById('shareableLink');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const education = document.getElementById('education').value;
        const expertise = document.getElementById('expertise').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const computerSkills = document.getElementById('computerSkills').value;
        const profilePictureInput = document.getElementById('profilePicture');
        
        let profilePictureBase64 = '';
        if (profilePictureInput.files.length > 0) {
            profilePictureBase64 = await convertToBase64(profilePictureInput.files[0]);
        }

        // Create resume content without extra heading for the name
        let resumeContent = `
            <p contenteditable="true"><strong>Name:</strong> ${name}</p>
            <p contenteditable="true"><strong>Email:</strong> ${email}</p>
            <p contenteditable="true"><strong>Phone:</strong> ${phone}</p>
            <p contenteditable="true"><strong>Address:</strong> ${address}</p>
            <h3 contenteditable="true">Education</h3>
            <p contenteditable="true">${education}</p>
            <h3 contenteditable="true">Expertise</h3>
            <p contenteditable="true">${expertise}</p>
            <h3 contenteditable="true">Experience</h3>
            <p contenteditable="true">${experience}</p>
            <h3 contenteditable="true">Skills</h3>
            <p contenteditable="true">${skills}</p>
            <h3 contenteditable="true">Computer Skills</h3>
            <p contenteditable="true">${computerSkills}</p>
        `;

        if (profilePictureBase64) {
            resumeContent = `
                <img src="${profilePictureBase64}" alt="Profile Picture" style="width:150px; height:auto; border-radius:50%; margin-bottom: 20px;">
                ${resumeContent}
            `;
        }

        // Display the generated resume in the output div
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
        }

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeContent);
        downloadLink.download = `${name.replace(/\s+/g, '_')}_resume.html`;
        downloadLink.textContent = "Download Your Resume";

        if (shareableLink) {
            shareableLink.innerHTML = "<p>Click below to download or share your resume:</p>";
            shareableLink.appendChild(downloadLink);
        }
    });

    // Convert image file to Base64
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
});
