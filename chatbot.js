// Thomes Properties Knowledge Base
const thomesPropertiesData = {
  "properties": [
    {
      "name": "Thomes Meadows",
      "location": "Hyderabad, Telangana",
      "plotsAvailable": 45,
      "areaOfDevelopment": "12 acres",
      "plotSize": "100-500 sq.ft",
      "price": "Contact for pricing",
      "status": "Open for booking"
    },
    {
      "name": "Thomes Valley",
      "location": "Bangalore, Karnataka",
      "plotsAvailable": 32,
      "areaOfDevelopment": "8 acres",
      "plotSize": "150-400 sq.ft",
      "price": "Contact for pricing",
      "status": "Limited availability"
    },
    {
      "name": "Thomes Gardens",
      "location": "Pune, Maharashtra",
      "plotsAvailable": 28,
      "areaOfDevelopment": "6.5 acres",
      "plotSize": "120-350 sq.ft",
      "price": "Contact for pricing",
      "status": "Open for booking"
    }
  ],
  "generalInfo": {
    "company": "Thomes Infra",
    "website": "https://thomesinfra.com",
    "certification": "RERA Certified",
    "areas": ["Hyderabad", "Bangalore", "Pune", "Chennai", "Mumbai"]
  }
};

// Initialize chatbot
class ThomesChatbot {
  constructor() {
    this.apiKey = null; // User will add their Hugging Face API key
    this.conversationHistory = [];
    this.initChatbot();
  }

  initChatbot() {
    this.createChatbotUI();
    this.setupEventListeners();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="chatbot-widget" class="chatbot-widget">
        <div class="chatbot-header">
          <span>🏠 Thomes Properties Assistant</span>
          <button id="chatbot-minimize" class="chatbot-btn">−</button>
        </div>
        <div id="chatbot-messages" class="chatbot-messages">
          <div class="chatbot-message bot-message">
            <p>👋 Hello! I'm your Thomes Properties Assistant. Ask me about our available properties, locations, plot availability, and development areas!</p>
          </div>
        </div>
        <div class="chatbot-input-area">
          <input 
            type="text" 
            id="chatbot-input" 
            placeholder="Ask about Thomes properties..." 
            class="chatbot-input"
          />
          <button id="chatbot-send" class="chatbot-send-btn">Send</button>
        </div>
      </div>
      <button id="chatbot-toggle" class="chatbot-toggle-btn">💬</button>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  setupEventListeners() {
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const minimizeBtn = document.getElementById('chatbot-minimize');

    sendBtn.addEventListener('click', () => this.handleMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleMessage();
    });
    toggleBtn.addEventListener('click', () => this.toggleChatbot());
    minimizeBtn.addEventListener('click', () => this.minimizeChatbot());
  }

  async handleMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    this.addMessageToUI(message, 'user');
    input.value = '';

    // Get response
    const response = await this.getResponse(message);
    this.addMessageToUI(response, 'bot');
  }

  async getResponse(userMessage) {
    // First, check local knowledge base
    const localResponse = this.searchLocalKnowledge(userMessage);
    if (localResponse) {
      return localResponse;
    }

    // If no local match, use Hugging Face API if key is available
    if (this.apiKey) {
      try {
        return await this.queryHuggingFace(userMessage);
      } catch (error) {
        console.error('HF API Error:', error);
        return "I couldn't reach the AI service. Please try again or contact us directly at kasaboinalithin@gmail.com";
      }
    }

    // Fallback response
    return "I can help you with information about Thomes properties. Please ask about:\n• Available properties\n• Plot availability\n• Development areas\n• Locations\n\nFor detailed information, visit thomesinfra.com";
  }

  searchLocalKnowledge(query) {
    const lowerQuery = query.toLowerCase();

    // Property inquiries
    if (lowerQuery.includes('available') || lowerQuery.includes('plots')) {
      let response = "📍 **Available Properties at Thomes Infra:**\n\n";
      thomesPropertiesData.properties.forEach(prop => {
        response += `**${prop.name}**\n• Location: ${prop.location}\n• Plots Available: ${prop.plotsAvailable}\n• Area: ${prop.areaOfDevelopment}\n• Plot Size: ${prop.plotSize}\n• Status: ${prop.status}\n\n`;
      });
      return response;
    }

    // Location inquiries
    if (lowerQuery.includes('location') || lowerQuery.includes('where')) {
      let response = "🌍 **Thomes Properties Locations:**\n";
      thomesPropertiesData.generalInfo.areas.forEach(area => {
        response += `• ${area}\n`;
      });
      response += `\nVisit: ${thomesPropertiesData.generalInfo.website}`;
      return response;
    }

    // Development area inquiries
    if (lowerQuery.includes('development') || lowerQuery.includes('acre')) {
      let response = "🏗️ **Development Areas:**\n\n";
      thomesPropertiesData.properties.forEach(prop => {
        response += `**${prop.name}**: ${prop.areaOfDevelopment} in ${prop.location}\n`;
      });
      return response;
    }

    // Company info
    if (lowerQuery.includes('thomes') || lowerQuery.includes('about')) {
      return `🏢 **About Thomes Infra**\n• Certified: ${thomesPropertiesData.generalInfo.certification}\n• Website: ${thomesPropertiesData.generalInfo.website}\n\nWe develop premium properties across India with full RERA compliance.`;
    }

    // Contact inquiries
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
      return `📞 **Contact Kasarise Realestate**\n• Email: kasaboinalithin@gmail.com\n• Phone: 9063038765\n• Alternate: 9949810785`;
    }

    return null;
  }

  async queryHuggingFace(message) {
    // Format the context for Hugging Face
    const context = `You are a helpful assistant for Thomes Infra real estate company. Answer questions about our properties based on this information:\n\n${JSON.stringify(thomesPropertiesData, null, 2)}\n\nUser question: ${message}`;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
          method: "POST",
          body: JSON.stringify({ inputs: context }),
        }
      );

      if (!response.ok) {
        throw new Error('HF API request failed');
      }

      const result = await response.json();
      return result[0]?.generated_text || "I couldn't generate a response.";
    } catch (error) {
      console.error(error);
      return "Error connecting to AI service. Please try again later.";
    }
  }

  addMessageToUI(message, sender) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}-message`;
    messageEl.innerHTML = `<p>${message}</p>`;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  toggleChatbot() {
    const widget = document.getElementById('chatbot-widget');
    widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
  }

  minimizeChatbot() {
    const widget = document.getElementById('chatbot-widget');
    widget.style.display = 'none';
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThomesChatbot();
});
