from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from matplotlib import font_manager
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import matplotlib
matplotlib.use('Agg')

app = Flask(__name__)
CORS(app)

@app.route('/api/plot', methods=['POST'])
@cross_origin()
def process_csv():
    try:
        file = request.files['csv']
        df = pd.read_csv(file)

        font_path = "/Library/Fonts/Arial Unicode.ttf"
        font_prop = font_manager.FontProperties(fname=font_path)
        plt.rcParams['font.family'] = font_prop.get_name()

        # 사용자가 선택한 두 개의 속성을 플로팅
        attribute1 = request.form.get('attribute1')  # 사용자가 선택한 첫 번째 속성
        attribute2 = request.form.get('attribute2')  # 사용자가 선택한 두 번째 속성

        plt.plot(df.loc[:, attribute1], df[attribute1], label=attribute1)
        plt.plot(df.loc[:, attribute2], df[attribute2], label=attribute2)

        plt.title('CSV 데이터 플롯', fontproperties=font_prop)
        plt.xlabel('X축', fontproperties=font_prop)
        plt.ylabel('Y축', fontproperties=font_prop)

        img = BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()

        # 이미지를 base64로 변환
        encoded_img = base64.b64encode(img.getvalue()).decode('utf-8')

        return jsonify({'image': encoded_img})

    except Exception as e:
        print(f"에러: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
