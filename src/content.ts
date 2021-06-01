chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	console.log('request', request);

	if (request.type === 'get_name') {
		const name = document.querySelector('.text-heading-xlarge');
		sendResponse({ name: name?.textContent });
	}
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
