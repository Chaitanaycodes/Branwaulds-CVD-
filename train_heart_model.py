import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("heart_attack_prediction_dataset.csv")

# Drop columns not useful
df = df.drop(columns=["Patient ID", "Country", "Continent", "Hemisphere"])

# Convert Sex
df["Sex"] = df["Sex"].map({"Male": 1, "Female": 0})

# Convert Diet column
df["Diet"] = df["Diet"].map({
    "Healthy": 2,
    "Average": 1,
    "Unhealthy": 0
})

# Convert Blood Pressure
df[["Systolic", "Diastolic"]] = df["Blood Pressure"].str.split("/", expand=True)

df["Systolic"] = df["Systolic"].astype(float)
df["Diastolic"] = df["Diastolic"].astype(float)

df = df.drop(columns=["Blood Pressure"])

# Target
y = df["Heart Attack Risk"]

# Features
X = df.drop(columns=["Heart Attack Risk"])

print("Feature Order Used for Training:")
print(X.columns)

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=200, random_state=42)

model.fit(X_train, y_train)

# Save model
joblib.dump(model, "heart_model.pkl")

print("Model trained successfully!")