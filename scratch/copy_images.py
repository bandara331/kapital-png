import shutil
import os

src_mission = r"C:\Users\Sasmitha Thejan\.gemini\antigravity-ide\brain\a9caec5b-b8be-4723-af87-37a26f00658a\mission_image_1790873981917.png"
dst_mission = r"C:\Users\Sasmitha Thejan\OneDrive\Desktop\Kapital network\public\images\mission.png"

src_vision = r"C:\Users\Sasmitha Thejan\.gemini\antigravity-ide\brain\a9caec5b-b8be-4723-af87-37a26f00658a\vision_image_1790874022938.png"
dst_vision = r"C:\Users\Sasmitha Thejan\OneDrive\Desktop\Kapital network\public\images\vision.png"

os.makedirs(r"C:\Users\Sasmitha Thejan\OneDrive\Desktop\Kapital network\public\images", exist_ok=True)

try:
    shutil.copy2(src_mission, dst_mission)
    print("Mission copied!")
except Exception as e:
    print(f"Error mission: {e}")

try:
    shutil.copy2(src_vision, dst_vision)
    print("Vision copied!")
except Exception as e:
    print(f"Error vision: {e}")
