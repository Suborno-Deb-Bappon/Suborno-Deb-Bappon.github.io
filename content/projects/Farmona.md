---
title: "Farmona - Smart Crop Prediction & Agronomic Analysis"
date: "2025-08-13"
company: "Self-Initiated"
tech:
  - Python
  - Scikit-learn
  - NumPy
  - Pandas
  - Matplotlib
  - Streamlit
github: "https://github.com/Suborno-Deb-Bappon/Farmona"
external: ""
showInProjects: true
---

Built an end-to-end crop classification system delivering 99.32% accuracy (weighted F1 = 0.9932) on a 440-sample holdout across 22 crops—just 3 misclassifications.

- Engineered 5 agronomic indices (THI, NBR, WAI, PP, SFI) and ran GridSearchCV over 7 algorithms with ≈420 hyperparameter fits to select the best leakage-safe Pipeline.
- Streamlit app supports one-click inference with top-5 class probabilities and schema-driven default auto-fill; artifacts packaged as 3 files (model, label encoder, schema) for reproducible rollout. 
- Produced full classification report and plots (confusion matrix, permutation importance, learning curves) to verify generalization and pinpoint edge cases (e.g., rice recall 0.95 in holdout).
