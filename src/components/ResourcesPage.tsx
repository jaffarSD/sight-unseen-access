
import React from 'react';

const ResourcesPage = () => {
  const resources = [
    {
      category: "Screen Readers",
      items: [
        { name: "NVDA", description: "Free screen reader for Windows", url: "https://www.nvaccess.org/" },
        { name: "JAWS", description: "Popular commercial screen reader", url: "https://www.freedomscientific.com/products/software/jaws/" },
        { name: "VoiceOver", description: "Built-in macOS and iOS screen reader", url: "https://www.apple.com/accessibility/vision/" },
        { name: "TalkBack", description: "Android's built-in screen reader", url: "https://support.google.com/accessibility/android/answer/6283677" }
      ]
    },
    {
      category: "Browser Extensions",
      items: [
        { name: "ChromeVox", description: "Chrome screen reader extension", url: "https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn" },
        { name: "High Contrast", description: "Browser extension for high contrast viewing", url: "https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph" },
        { name: "Zoom Text Only", description: "Zoom text without affecting images", url: "https://chrome.google.com/webstore/detail/zoom-text-only/jamhfhbppcmkgghlkeieококibjdljmp" }
      ]
    },
    {
      category: "Organizations & Support",
      items: [
        { name: "National Federation of the Blind", description: "Advocacy and support organization", url: "https://nfb.org/" },
        { name: "American Foundation for the Blind", description: "Resources and advocacy", url: "https://www.afb.org/" },
        { name: "Braille Institute", description: "Education and services for the blind", url: "https://brailleinstitute.org/" },
        { name: "Hadley Institute", description: "Distance education for vision loss", url: "https://hadley.edu/" }
      ]
    },
    {
      category: "Web Accessibility Guidelines",
      items: [
        { name: "WCAG 2.1 Guidelines", description: "Web Content Accessibility Guidelines", url: "https://www.w3.org/WAI/WCAG21/quickref/" },
        { name: "WebAIM", description: "Web accessibility resources and training", url: "https://webaim.org/" },
        { name: "A11y Project", description: "Community-driven accessibility resources", url: "https://www.a11yproject.com/" },
        { name: "Accessibility Developer Guide", description: "Practical accessibility guide for developers", url: "https://www.accessibility-developer-guide.com/" }
      ]
    }
  ];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <section aria-labelledby="resources-heading">
          <h1 id="resources-heading" className="text-4xl font-bold mb-6">
            Accessibility Resources
          </h1>
          
          <p className="text-xl mb-8 leading-relaxed">
            Discover helpful tools, organizations, and resources designed to support 
            visually impaired users in their digital journey.
          </p>
        </section>

        {resources.map((category, categoryIndex) => (
          <section key={categoryIndex} aria-labelledby={`category-${categoryIndex}`}>
            <h2 id={`category-${categoryIndex}`} className="text-3xl font-bold mb-6">
              {category.category}
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-describedby={`desc-${categoryIndex}-${itemIndex}`}
                    >
                      {item.name}
                    </a>
                  </h3>
                  <p id={`desc-${categoryIndex}-${itemIndex}`} className="text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Link opens in new window
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="keyboard-shortcuts-heading">
          <h2 id="keyboard-shortcuts-heading" className="text-3xl font-bold mb-6">
            Keyboard Shortcuts
          </h2>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold mb-3">General Navigation</h3>
                <ul className="space-y-2">
                  <li><strong>Tab:</strong> Move to next element</li>
                  <li><strong>Shift + Tab:</strong> Move to previous element</li>
                  <li><strong>Enter:</strong> Activate button or link</li>
                  <li><strong>Space:</strong> Activate button or checkbox</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Browser Shortcuts</h3>
                <ul className="space-y-2">
                  <li><strong>Ctrl + Plus:</strong> Zoom in</li>
                  <li><strong>Ctrl + Minus:</strong> Zoom out</li>
                  <li><strong>Ctrl + 0:</strong> Reset zoom</li>
                  <li><strong>F5:</strong> Refresh page</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-3xl font-bold mb-6">
            Tips for Better Web Accessibility
          </h2>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="space-y-4 text-lg">
              <li>
                <strong>Enable your screen reader:</strong> Make sure your screen reader is running before browsing.
              </li>
              <li>
                <strong>Use headings to navigate:</strong> Most screen readers allow you to jump between headings for faster navigation.
              </li>
              <li>
                <strong>Check for skip links:</strong> Look for "Skip to main content" links at the top of pages.
              </li>
              <li>
                <strong>Adjust browser settings:</strong> Increase default font sizes and enable high contrast in your browser.
              </li>
              <li>
                <strong>Report accessibility issues:</strong> Contact websites when you encounter accessibility barriers.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResourcesPage;
