from django.shortcuts import redirect, render
from django.conf import settings
from PIL import Image
import pytesseract
from django.core.files.storage import FileSystemStorage
import csv
import xlsxwriter
import random
import pandas as pd
import numpy as np
from pathlib import Path
import os
from .forms import ContactForm

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
print(BASE_DIR)

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe"

def upload(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        im = Image.open(myfile)
        text = pytesseract.image_to_string(im, lang='eng')
        first = text[0:200]
        second = text[200:400]
        third = text[400:600]
        forth = text[600:800]
        fifth = text[800:1000]
        sixth = text[1000:1200]
        seventh = text[1200:1400]
        eighth = text[1400:1600]
        nineth = text[1600:1800]
        tenth = text[1800:2000]
        elevent = text[2000:2200]
        twelve = text[2200:2400]
        thirteen = text[2400:2600]
        forteen = text[2600:2800]
        fifteen = text[3000:3200]
        sixteen = text[3200:3400]
        seventeen = text[3400:]
        data = [first, second, third, forth, fifth, sixth, seventh, eighth, nineth , tenth, elevent, twelve, thirteen, forteen, fifteen, sixteen, seventeen]
        fpath = os.path.join(BASE_DIR, f'app/static/csv/{myfile}.xlsx')
        workbook = xlsxwriter.Workbook(fpath)
        worksheet = workbook.add_worksheet()
        # worksheet.write("A1", text)
        a = random.randint(98,99)
        for i in range(1,len(data)+1):
         worksheet.write(i,0,data[i-1])
        workbook.close()
        #print(os.listdir(fpath))
        # path = 'static/csv'
        # with open(fpath,'w') as fp:
        #     a = csv.writer(fp)
        #     data = [[first, second, third, forth, fifth, sixth, seventh, eighth, nineth , tenth, elevent, twelve, thirteen, forteen, fifteen, sixteen, seventeen]]
        #     for row in data:
        #      a.writerow(row)
        
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        
        fullpath = f'csv/{myfile}.xlsx'
        return render(request, 'result.html', {'fp':fullpath, 'file':myfile.name, 'a':a})
    return render(request, 'index.html')


def result(request):
    return render(request, 'result.html')

def compare(request):
     if request.method == 'POST':
        myfile1 = request.FILES['myfile1']
        myfile2 = request.FILES['myfile2']
        dffile1 = pd.read_excel(myfile1)
        dffile2 = pd.read_excel(myfile2)
        comparevalues = dffile1.values == dffile2.values
        lt = []
        val = []
        # if True in comparevalues:
        #     lt.append(comparevalues)
        # print(lt)
        # print(comparevalues)
        rows,cols = np.where(comparevalues==False)
        # print(a)
        for item in zip(rows,cols):
            dffile1.iloc[item[0], item[1]] = '{} --> {}'.format(dffile1.iloc[item[0], item[1]],dffile2.iloc[item[0], item[1]])
            lt.append(dffile1.iloc[item[0], item[1]])
            val.append(item)
            
        print(lt)
        excelpath = os.path.join(BASE_DIR, f'app/static/compare/{myfile2}.xlsx')
        filepath = f'compare/{myfile2}.xlsx'
        dffile1.to_excel(excelpath,index=False,header=True)
        output=dffile1
        fs = FileSystemStorage()
        filename1 = fs.save(myfile1.name, myfile1)
        filename2 = fs.save(myfile2.name, myfile2)     
        return render(request, 'compresult.html',{'fm1':filename1,'fm':filepath, 'comp':lt, 'pos':val})
     return render(request, 'compare.html')

def compresult(request):
    return render(request, 'compresult.html')


def about(request):
    return render(request, 'about.html')


def contact(request):
   if request.method == 'POST':
      form = ContactForm(request.POST)
      if form.is_valid():
            form.save()
            return redirect('/')
   else:  
       form = ContactForm()
   return render(request, 'contact.html', {'form': form})
   
def handlelogin(request):
    return render(request,'login.html')

def handlesignup(request):
    return render(request,'signup.html')
