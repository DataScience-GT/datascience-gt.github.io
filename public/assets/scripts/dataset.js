const data_set = {
    "GT Athletics": {
        "type": "Text",
        "description": "Data + info for the track challenge!",
        "link": "https://gtvault-my.sharepoint.com/:f:/g/personal/da116_gatech_edu/EhBBi1-E8JhCnpIcDfn2OZ0B3ShDvEkKIvG9mJ8cN3VWww?e=jwOIH4"
    },
    "Malicious vs Benign Websites": {
        "type": "Numeric",
        "description": "Kaggle Dataset containing network & URL features that can be used to determine whether a website is legitimate or fraudulent",
        "link": "https://www.kaggle.com/xwolf12/malicious-and-benign-websites"
    },
    "Network Attacks Dataset": {
        "type": "Numeric",
        "description": "Kaggle Dataset provided by Australian Centre for Cyber Security with the purpose of stopping network attacks",
        "link": "https://www.kaggle.com/mrwellsdavid/unsw-nb15?select=UNSW_NB15_testing-set.csv"
    },
    "Country Research Paper": {
        "type": "Numeric",
        "description": "Research paper/capita and other similar metrics for countries, downloadable, not the most extensive",
        "link": "https://www.scimagojr.com/countryrank.php"
    },
    "NYSE Fundamentals": {
        "type": "Numeric",
        "description": "Stocks on NYSE, 2012-2016, fundamental analysis",
        "link": "https://www.kaggle.com/dgawlik/nyse"
    },
    "Fake vs Real News": {
        "type": "Text",
        "description": "Kaggle dataset listing various fake vs real news articles. Train a classifier to determine what’s real and what’s not!",
        "link": "https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset?select=Fake.csv"
    },
    "IMDB": {
        "type": "Text",
        "description": "Movie review datasets. Apart from the training and test review examples, there is further unlabeled data for use as well. Raw text and preprocessed bag of words formats have also been included.",
        "link": "http://ai.stanford.edu/~amaas/data/sentiment/"
    },
    "Sentiment140": {
        "type": "Text",
        "description": "Sentiment140 is a tweet dataset that can be used for sentiment analysis. It's a popular dataset that is perfect for starting off your NLP journey. Emotions have been pre-removed from the data. The final dataset has the below 6 features",
        "link": "http://help.sentiment140.com/for-students/"
    },
    "Yelp Reviews": {
        "type": "Text",
        "description": "This is an open dataset released by Yelp for learning purposes. It consists of millions of user reviews, businesses attributes and over 200,000 pictures from multiple metropolitan areas. This is a very commonly used dataset for NLP challenges globally.",
        "link": "https://www.yelp.com/dataset"
    },
    "Wikipedia Data": {
        "type": "Text",
        "description": "Text data scraped from Wikipedia",
        "link": "https://nlp.cs.nyu.edu/wikipedia-data/"
    },
    "MNIST": {
        "type": "Image",
        "description": "70,000 Images of black & white handwritten digits (0 - 9) of resolution 28x28. Great for pattern recognition tasks.",
        "link": "https://datahack.analyticsvidhya.com/contest/practice-problem-identify-the-digits/"
    },
    "COCO": {
        "type": "Image",
        "description": "COCO is large-scale and rich for object detection, segmentation and captioning dataset. It has several features such as object segmentation, 330K images, 1.5 million object instances, 80 object categories, and image captions",
        "link": "https://cocodataset.org/#home"
    },
    "Image Net": {
        "type": "Image",
        "description": "ImageNet is a dataset of images that are organized according to the WordNet hierarchy. WordNet contains approximately 100,000 phrases and ImageNet has provided around 1000 images on average to illustrate each phrase.",
        "link": "http://www.image-net.org/"
    },
    "CIFAR-10": {
        "type": "Image",
        "description": "This dataset is another one for image classification. It consists of 60,000 images of 10 classes (each class is represented as a row in the above image). In total, there are 50,000 training images and 10,000 test images. The dataset is divided into 6 parts – 5 training batches and 1 test batch. Each batch has 10,000 images.",
        "link": "http://www.cs.toronto.edu/~kriz/cifar.html"
    },
    "IMDB (2)": {
        "type": "Combined",
        "description": "Kaggle dataset: numeric and text data on 81k movies. Ratings CSV is entirely numerical, Names is text",
        "link": "https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset"
    },
    "AirBNB Ratings": {
        "type": "Combined",
        "description": "Kaggle dataset: combined text and numerical data from amenities lists, ratings, number of bathrooms etc",
        "link": "https://www.kaggle.com/samyukthamurali/airbnb-ratings-dataset"
    }
}

function dataset_populate() {
    const dataset_table = document.getElementById("dataset-table");
    for (data_name in data_set) {
        var data = data_set[data_name];
        var row = document.createElement("tr");
        row.classList.add("row");
        // Create the 1st cell: name of the data and embeded link
        var name_cell = document.createElement("td");
        var link = document.createElement("a");
        var link_text = document.createTextNode(data_name);
        link.appendChild(link_text);
        link.href = data["link"];
        link.target = "_blank";
        link.style.textDecoration = "none";
        link.style.color = "inherit";
        link.style.fontFamily = "Red Hat Text";
        link.style.fontWeight = "600";
        name_cell.appendChild(link);
        name_cell.classList.add("col-12", "col-md-3")
        row.appendChild(name_cell);
        // Create the 2nd cell: type of the data
        var type_cell = document.createElement("td");
        var type_text = document.createTextNode(data["type"]);
        type_cell.appendChild(type_text);
        type_cell.classList.add("col-12", "col-md-1", "d-none", "d-md-table-cell");
        row.appendChild(type_cell);
        // Create the 3rd cell: description of the data
        var description_cell = document.createElement("td");
        var description_text = document.createTextNode(data["description"]);
        description_cell.appendChild(description_text);
        description_cell.classList.add("col-12", "col-md-8", "d-none", "d-md-table-cell");
        row.appendChild(description_cell);
        // Append the row to the dataset_table
        dataset_table.appendChild(row);
    }
}