import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

data = pd.read_csv("diabetes_prediction_dataset.csv")

le = LabelEncoder()

data["gender"] = le.fit_transform(data["gender"])
data["smoking_history"] = le.fit_transform(data["smoking_history"])

X = data.drop("diabetes", axis=1)
y = data["diabetes"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()

model.fit(X_train, y_train)

print("Accuracy:", model.score(X_test, y_test))

joblib.dump(model, "diabetes_model.pkl")
