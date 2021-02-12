from flask import Flask, render_template, request
app = Flask(__name__)
@app.route('/')
def student():
   return render_template('tasklist.js')


@app.route('/result',methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      result = request.form
      return render_template("showTasks.js",result = result)


if __name__ == 'main':
   app.run(debug = True)