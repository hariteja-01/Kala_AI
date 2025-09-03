"""
Kala-AI Backend: FastAPI server for Indian artisan craft analysis
Uses Google Gemini API for AI-powered cultural storytelling and product analysis
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
import json
import io
from PIL import Image
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Kala-AI Backend",
    description="AI-powered platform for Indian artisan craft analysis and storytelling",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY environment variable not set")
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Kala-AI Backend"}

@app.post("/analyze")
async def analyze_craft_image(file: UploadFile = File(...)):
    """
    Analyze uploaded craft image using Gemini Vision API
    Returns comprehensive analysis including cultural context and marketing content
    """
    try:
        # Validate file type
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Validate file size (10MB limit)
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=400, detail="File size must be less than 10MB")
        
        # Process image
        image = Image.open(io.BytesIO(contents))
        
        # Create comprehensive prompt for Gemini
        prompt = """
        Analyze this Indian craft/artwork image and provide a comprehensive analysis in the following JSON format. 
        Be culturally sensitive and celebrate the rich heritage of Indian artisans.

        Please respond with valid JSON containing these fields:

        {
            "analysis": {
                "art_form": "Name of the craft/art form",
                "region": "Specific region/state of origin",
                "materials": ["list", "of", "materials"],
                "style": "Artistic style description",
                "skill_level": "Beginner/Intermediate/Advanced/Master",
                "cultural_significance": "Brief cultural importance",
                "color_palette": ["#hex1", "#hex2", "#hex3"],
                "estimated_time": "Time to create this piece",
                "confidence": 0.85
            },
            "storytelling": {
                "origin_story": "Rich, engaging story about this craft's cultural origins and significance (150-200 words)",
                "artisan_narrative": "Personal story connecting this piece to the artisan's journey (100-150 words)",
                "cultural_context": "Historical and cultural background (100 words)"
            },
            "product_details": {
                "title": "Attractive product title",
                "description": "Detailed product description highlighting uniqueness (200-250 words)",
                "key_features": ["feature1", "feature2", "feature3", "feature4"],
                "care_instructions": "How to maintain this craft",
                "authenticity_markers": ["marker1", "marker2", "marker3"]
            },
            "marketing": {
                "price_range": {
                    "min": 1500,
                    "max": 5000,
                    "currency": "INR",
                    "rationale": "Pricing justification"
                },
                "target_audience": ["audience1", "audience2", "audience3"],
                "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
                "instagram_captions": [
                    {
                        "style": "Storytelling",
                        "caption": "Engaging story-based caption with emojis"
                    },
                    {
                        "style": "Cultural",
                        "caption": "Cultural heritage focused caption"
                    },
                    {
                        "style": "Modern",
                        "caption": "Contemporary appeal caption"
                    }
                ],
                "seo_keywords": ["keyword1", "keyword2", "keyword3"],
                "unique_selling_points": ["usp1", "usp2", "usp3"]
            }
        }

        Focus on celebrating Indian craftsmanship, cultural heritage, and the artisan's skill. Be authentic and respectful.
        """

        # Generate content with Gemini
        response = model.generate_content([prompt, image])
        
        # Parse the response
        try:
            # Extract JSON from response
            response_text = response.text
            # Clean up the response to extract JSON
            if "```json" in response_text:
                json_start = response_text.find("```json") + 7
                json_end = response_text.find("```", json_start)
                response_text = response_text[json_start:json_end]
            elif "{" in response_text:
                json_start = response_text.find("{")
                json_end = response_text.rfind("}") + 1
                response_text = response_text[json_start:json_end]
            
            result = json.loads(response_text)
            
            return JSONResponse(content={
                "success": True,
                "data": result,
                "message": "Analysis completed successfully"
            })
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}")
            logger.error(f"Raw response: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to parse AI response")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Get port from environment variable (for Render deployment)
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"Starting Kala-AI Backend on {host}:{port}")
    uvicorn.run(app, host=host, port=port)