# Kasarise Realestate - AI Chatbot Integration Guide

## 🤖 Chatbot Features

Your Kasarise Realestate website now includes an AI-powered chatbot trained on Thomes properties! The chatbot can answer questions about:

- ✅ Available properties
- ✅ Plot availability (number of plots)
- ✅ Development areas
- ✅ Property locations
- ✅ Contact information

## 🚀 Getting Started

The chatbot works out of the box with local knowledge about Thomes properties. To enable AI-powered responses, follow the optional setup below.

---

## 📋 Optional: Enable Hugging Face AI Responses

### Step 1: Get Your Hugging Face API Key

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up (free account)
3. Go to **Settings** → **Access Tokens**
4. Create a new token (give it a name like "Kasarise Chatbot")
5. Copy the token

### Step 2: Add API Key to Chatbot

Edit `chatbot.js` and find this line (around line 70):

```javascript
this.apiKey = null; // User will add their Hugging Face API key
```

Replace `null` with your API key:

```javascript
this.apiKey = "hf_YOUR_TOKEN_HERE"; // Replace with your actual token
```

### Step 3: Commit and Redeploy

```bash
git add chatbot.js
git commit -m "Add Hugging Face API key for AI responses"
git push origin master
```

Vercel will automatically redeploy!

---

## 📝 Thomes Properties Data

The chatbot includes information about these Thomes properties:

### 1. **Thomes Meadows** - Hyderabad, Telangana
- Plots Available: 45
- Development Area: 12 acres
- Plot Size: 100-500 sq.ft
- Status: Open for booking

### 2. **Thomes Valley** - Bangalore, Karnataka
- Plots Available: 32
- Development Area: 8 acres
- Plot Size: 150-400 sq.ft
- Status: Limited availability

### 3. **Thomes Gardens** - Pune, Maharashtra
- Plots Available: 28
- Development Area: 6.5 acres
- Plot Size: 120-350 sq.ft
- Status: Open for booking

---

## 💬 How Customers Use the Chatbot

Customers can ask questions like:
- "What properties do you have available?"
- "How many plots are available in Hyderabad?"
- "Tell me about development areas"
- "Where are your properties located?"
- "How can I contact you?"

---

## 🔐 Security Note

**Important:** Never commit your API key to a public repository! For production:

1. Use environment variables
2. Store the key on a backend server
3. Never expose keys in client-side code

For now, the chatbot works well with local knowledge only.

---

## 📞 Support

For questions about the chatbot integration, contact:
- **Email:** kasaboinalithin@gmail.com
- **Phone:** 9063038765

---

## 🎨 Customization

### Add More Properties

Edit the `thomesPropertiesData` object in `chatbot.js`:

```javascript
const thomesPropertiesData = {
  "properties": [
    {
      "name": "Your Property Name",
      "location": "City, State",
      "plotsAvailable": 50,
      "areaOfDevelopment": "15 acres",
      "plotSize": "100-500 sq.ft",
      "price": "Contact for pricing",
      "status": "Open for booking"
    }
    // Add more properties here
  ]
};
```

### Customize Chatbot Appearance

Edit the CSS in `style.css` under the "/* Chatbot Styles */" section to change colors, size, or positioning.

---

## 📱 Responsive Design

The chatbot is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile devices

---

**Version:** 1.0  
**Last Updated:** May 23, 2026  
**Created for:** Kasarise Realestate
