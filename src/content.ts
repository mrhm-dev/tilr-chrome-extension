chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	// response with linkedin profile name
	if (request.type === 'get_name') {
		const name = document.querySelector('.text-heading-xlarge');
		sendResponse({ name: name?.textContent });
	}

	// response with linkedin profile about, experience, education etc.
	if (request.type === 'get_html') {
		const about = document.querySelector(
			'.pv-profile-section.pv-about-section'
		);
		const experience = document.querySelector(
			'.pv-profile-section.experience-section'
		);
		const education = document.querySelector(
			'.pv-profile-section.education-section'
		);
		const volunteering = document.querySelector(
			'.pv-profile-section.volunteering-section'
		);
		const skill = document.querySelector(
			'.pv-profile-section​.pv-skill-categories-section'
		);

		const text = `${about?.innerHTML.toString()}${experience?.innerHTML.toString()}${education?.innerHTML.toString()}${volunteering?.innerHTML.toString()}${skill?.innerHTML.toString()}`;

		sendResponse({ text });
	}
});
