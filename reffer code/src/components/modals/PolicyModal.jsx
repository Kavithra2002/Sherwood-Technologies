import React from 'react'

function PolicyModal({ type, closeModal }) {
  let title = '';
  let content = null;

  if (type === 'privacy') {
    title = 'Privacy Policy';
    content = (
      <>
        <h3>1. Introduction</h3>
        <p>Welcome to Universe3D. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
        
        <h3>2. Data We Collect</h3>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data, Contact Data, Technical Data, Profile Data, and Usage Data.</p>
        
        <h3>3. How We Use Your Data</h3>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide and improve our immersive 3D mapping services, manage our relationship with you, and administer and protect our business.</p>

        <h3>4. Data Security</h3>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.</p>
      </>
    );
  } else if (type === 'terms') {
    title = 'Terms of Service';
    content = (
      <>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using Universe3D, you agree to be bound by these Terms of Service. If you do not agree, you may not access or use our services.</p>
        
        <h3>2. Use of Services</h3>
        <p>You agree to use Universe3D only for lawful purposes, and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the platform.</p>
        
        <h3>3. Intellectual Property</h3>
        <p>The content, layout, design, data, databases and graphics on this platform are protected by intellectual property laws and are owned by TeamExploreX unless otherwise stated.</p>
        
        <h3>4. Limitation of Liability</h3>
        <p>Universe3D shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>
      </>
    );
  } else if (type === 'cookie') {
    title = 'Cookie Policy';
    content = (
      <>
        <h3>1. What Are Cookies</h3>
        <p>Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>
        
        <h3>2. How We Use Cookies</h3>
        <p>We use essential cookies to make our application work. We also use optional analytics cookies to help us improve it. We won't set optional cookies unless you enable them.</p>

        <h3>3. Types of Cookies We Use</h3>
        <p><strong>Strictly Necessary Cookies:</strong> Required for the operation of our platform. <br/> <strong>Analytics/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</p>
        
        <h3>4. Managing Cookies</h3>
        <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this platform may become inaccessible or not function properly.</p>
      </>
    );
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content policy-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal} aria-label="Close modal">&times;</button>
        <div className="modal-header">
          <h2>{title}</h2>
          <p>Last updated: March 2026</p>
        </div>
        <div className="policy-block">
          {content}
        </div>
      </div>
    </div>
  )
}

export default PolicyModal
