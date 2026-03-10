import os
import glob

html_files = glob.glob('*.html')
preconnects = """
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://firebasestorage.googleapis.com">"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Preconnects
    if 'rel="preconnect"' not in content:
        # Insert after <head> or before </head>
        if '<link rel="stylesheet"' in content:
            content = content.replace('<link rel="stylesheet"', preconnects + '\n  <link rel="stylesheet"', 1)
        elif '</head>' in content:
            content = content.replace('</head>', preconnects + '\n</head>', 1)
            
    # 2. Version CSS
    content = content.replace('href="style.css"', 'href="style.css?v=3"')
    
    # 3. Version and defer main.js
    content = content.replace('<script src="main.js"></script>', '<script src="main.js?v=3" defer></script>')
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Processed {len(html_files)} root HTML files.")
