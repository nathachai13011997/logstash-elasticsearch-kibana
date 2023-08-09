// send check culster
GET _cluster/health

// get all index show header
GET _cat/indices?v

// get all index with JSON
GET _cat/indices?format=JSON

// create index and document with random id
POST banktest/_doc
{
  "name": "Nathachai",
  "surname": "Rungsaeng",
  "age": 26
}

// create index and document with specify id and can also update that document
POST banktest/_doc/1
{
  "name": "Hello",
  "surname": "World",
  "age": 26
}


// create index and document with specify id
POST banktest/_create/1
{
  "name": "Helloxxx",
  "surname": "Worldxxx",
  "age": 26
}

// delete document with specify id
DELETE banktest/_doc/1

// search data all of index banktest 
GET banktest/_search

// search data all of index products
GET products/_search

// search data all of index accounts
GET accounts/_search

// search data all of index orders
GET orders/_search

// search data all of index recipes
GET recipes/_search

// search data that name equal 'Pasta' in index products
GET products/_search?q=name:Pasta

// test analyze standard
GET _analyze
{
  "text": "2 guys walk into a bar, but the third... DUCKS! :-)",
  "analyzer": "standard"
}

// test analyze standard
GET _analyze
{
  "text": "2 guys walk into a bar, but the third... DUCKS! :-)",
  "char_filter": [],
  "tokenizer": "standard",
  "filter": ["lowercase"]
}

// test analyze cut syntax html
GET _analyze
{
  "text": "<div>2 guys walk into a bar, but the third... DUCKS! :-)</div>",
  "char_filter": ["html_strip"],
  "tokenizer": "standard",
  "filter": ["lowercase"]
}

// test analyzer thai
GET _analyze
{
  "text": "สวัสดีครับยินดีต้อนรับ",
  "analyzer": "thai"
}

// insert multiple data with specify index
POST _bulk
{"index":{"_index":"banktest", "_id": 1}}
{"name": "Nathachaixx","surname":"Rungsaengxx","age":"29"}
{"index":{"_index":"banktest", "_id": 2}}
{"name": "Bank","surname":"Test","age":"20"}

// insert nultiple data with specify index in path
POST banktest/_bulk
{"index":{"_id": 3}}
{"name": "Nathachaixx","surname":"Rungsaengxx","age":"29"}
{"index":{"_id": 4}}
{"name": "Bank","surname":"Test","age":"20"}

// create index and field
PUT bankanalyze
{
  "mappings": {
    "properties": {
      "eng": {
        "type": "text",
        "analyzer": "standard"
      },
      "thai": {
        "type": "text",
        "analyzer": "thai"
      }
    }
  }
}

// create document id '1' field eng and thai
POST bankanalyze/_doc/1
{
  "eng": "Hello World",
  "thai": "สวัสดีครับยินดีต้อนรับ"
}

// create document id '2' field eng and thai
POST bankanalyze/_doc/2
{
  "eng": "สวัสดีครับยินดีต้อนรับ",
  "thai": "สวัสดีครับยินดีต้อนรับ"
}

// query data field eng equal 'Hello' in index bankanalyze
GET bankanalyze/_search?q=eng:Hello

// query data field eng equal 'Hello' in index bankanalyze ( full text queries )
GET bankanalyze/_search
{
  "query": {
    "match": {
      "eng": "Hello"
    }
  }
}

// query data with text
GET bankanalyze/_analyze
{
  "text": ["Hello World"]
}

// term queries
GET bankanalyze/_search
{
  "query": {
    "term": {
      "eng": "hello"
    }
  }
}

// limit size with path
GET products/_search?size=20

// limit size
GET recipes/_search
{
  "size": 2
}

// show field title and prepatation_time_minutes
GET recipes/_search
{
  "_source": ["title", "preparation_time_minutes"]
}

// not show field description
GET recipes/_search
{
  "_source": {
    "excludes": ["description"]
  }
}

// not show field
GET recipes/_search
{
  "_source": false
}

// total_pages = ceil(total_hits / page_size) สูตรหา จำนวน page ว่ามีกี่หน้า
// from = page_size * (page_number -1)
GET products/_search
{
  "_source": false, // เหมือน กับ select ของ sql ( not show field )
  "size": 10, // ขนาดเท่าไหร่ ( size )
  "from": 0 // เริ่มจากรายการไหน ( start document )
}

// Sort field preparation_time_minutes with asc
GET recipes/_search
{
  "_source": ["preparation_time_minutes"],
  "sort": [
    {
      "preparation_time_minutes": {
        "order": "asc" // asc, desc
      }
    }
  ]
}

// Sort field preparation_time_minutes with desc, Sort field create with asc
GET recipes/_search
{
  "_source": ["preparation_time_minutes", "created"],
  "sort": [
    { "preparation_time_minutes": "desc" },
    { "created": "asc" }
  ]
}

// Score
GET products/_search
{
  "query": {
    "term": {
      "name": {
        "value": "lobster"
      }
    }
  },
  "explain": true
}

// Keyword search with full key word
GET bank/_search
{
  "query": {
    "term": {
      "name.keyword": {
        "value": "Hello Bank"
      }
    }
  }
}

// Search with multiple term
GET products/_search
{
  "query": {
    "terms": {
      "tags.keyword": [
        "Alcohol",
        "Wine"
      ]
    }
  }
}

// Search with ID
GET products/_search
{
  "query": {
    "ids": {
      "values": [1,2,3]
    }
  }
}

// Search range value
GET products/_search
{
  "query": {
    "range": {
      "in_stock": {
        "gte": 10,
        "lte": 24
      }
    }
  }
}

// Search range with date
GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01",
        "lte": "2010/12/31"
      }
    }
  }
}

// Search range with date change format in query 
GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "01-01-2010",
        "lte": "31-12-2010",
        "format": "dd-MM-yyyy"
      }
    }
  }
}

// Search range with date minus 1 month
GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2017/01/01||-1M"
      }
    }
  }
}

// Search range with date now minus 4 year or now minus 1 M ( now: have date and time )
GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "now-4y" // now-1M
      }
    }
  }
}

// Search range with date now round dow month and minus 6 year
GET products/_search
{
  "_source": ["created"],
  "size": 20, 
  "query": {
    "range": {
      "created": {
        "gte": "now/M-6y"
      }
    }
  }
}

// Search field tags with not null
GET products/_search
{
  "query": {
    "exists": {
      "field": "tags"
    }
  }
}

// Search field tags with null
GET products/_search
{
  "query": {
    "bool": {
      "must_not": [
        {
          "exists": {
            "field": "tags"
          }
        }
      ]
    }
  }
}


// Search with prefix ( prefix same like of sql )
GET products/_search
{
  "query": {
    "prefix": {
      "tags.keyword": {
        "value": "Vege"
      }
    }
  }
}

// Search with wildcard ( word end table )
GET products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": {
        "value": "*table"
      }
    }
  }
}

// Search with wildcard ( word start Veget )
GET products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": {
        "value": "Veget*"
      }
    }
  }
}

// Search with wildcard ( word start Veget and word end able )
GET products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": {
        "value": "Vege?able"
      }
    }
  }
}


// Search with regular expression
GET products/_search
{
  "query": {
    "regexp": {
      "tags.keyword": "Veg[a-zA-Z]+ble"
    }
  }
}

// Full text query (same search google)
GET recipes/_search
{
  "query": {
    "match": {
      "title": "pasta spaghetti"
    }
  },
  "_source": ["title"]
}

// Full text query use operator 'and'
GET recipes/_search
{
  "query": {
    "match": {
      "title": {
        "query": "pasta spaghetti",
        "operator": "and"
      }
    }
  },
  "_source": ["title"]
}

// Mathing phrases (specific words)
GET recipes/_search
{
  "query": {
    "match_phrase": {
      "title": "Pasta or Spaghetti"
    }
  }
}


// Muti-match query (search word pasta mutiple fields)
GET recipes/_search
{
  "query": {
    "multi_match": {
      "query": "pasta",
      "fields": ["title", "description"]
    }
  }
}

//Bool query
GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "pasta"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": "cheese"
          }
        }
      ],
      "should": [ // make the score increase
        {
          "match": {
            "ingredients.name": "shallot"
          }
        }
      ], 
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}


// query name ( which check match query )
GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": {
              "query": "pasta",
              "_name": "pasta_must"
            }
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": {
              "query": "cheese",
              "_name": "cheese_must_not"
            }
          }
        }
      ],
      "should": [
        {
          "match": {
            "ingredients.name": {
              "query": "shallot",
              "_name": "shallot_should"
            }
          }
        }
      ], 
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

// Metrics Aggregations ( show structure index )
GET bankanalyze/_mapping

// query sum field  total_amount
GET orders/_search
{
  "size": 0,
  "aggs": {
    "total_sales": {
      "sum": {
        "field": "total_amount"
      }
    }
  }
}

// query sum , avg , max and min field total_amount
GET orders/_search
{
  "size": 0,
  "aggs": {
    "total_sales": {
      "sum": {
        "field": "total_amount"
      }
    },
    "avg_sale": {
      "avg": {
        "field": "total_amount"
      }
    },
    "min_sale": {
      "min": {
        "field": "total_amount"
      }
    },
    "max_sale": {
      "max": {
        "field": "total_amount"
      }
    },
    "total_saleman": {
      "cardinality": { // count unique
        "field": "salesman.id"
      }
    },
    "value_count": {
      "value_count": { // count all
        "field": "salesman.id"
      }
    },
    "stats": { // show value min , max , avg , sum field total_amount
      "stats": {
        "field": "total_amount"
      }
    }
  }
}

// Bucket aggregation ( same group by of sql )
GET orders/_search
{
  "size": 0,
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status.keyword",
        "size": 10
      }
    }
  }
}

//Nested aggregation
GET orders/_search
{
  "size": 0,
  "query": {
    "range": {
      "total_amount": {
        "gte": 100
      }
    }
  }, 
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status.keyword",
        "size": 10
      },
      "aggs": {
        "status_stat": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    },
    "all_orders":{
      "global": {},
      "aggs": {
        "global_stat": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

// Fitering out documents
GET orders/_search
{
  "size": 0,
  "aggs": {
    "low_value": {
      "filter": {
        "range": {
          "total_amount": {
            "lte": 50
          }
        }
      },
      "aggs": {
        "stat_lowvalue": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

//Defining bucket rules with filters
GET recipes/_search
{
  "size": 0,
  "aggs": {
    "my_filter": {
      "filters": {
        "filters": {
          "pasta": {
            "match": {
              "title": "pasta"
            }
          },
          "spaghetti": {
            "match": {
              "title": "spaghetti"
            }
          }
        }
      },
      "aggs": {
        "avg_rating": {
          "avg": {
            "field": "ratings"
          }
        }
      }
    }
  }
}

//Range aggregations
GET orders/_search
{
  "_source": ["total_amount"],
  "sort": [
    {
      "total_amount": {
        "order": "asc"
      }
    }
  ]
}

//Range aggregations
GET orders/_search
{
  "size": 0,
  "aggs": {
    "amount_distribution": {
      "range": {
        "field": "total_amount",
        "ranges": [
          {
            "to": 10.8
          },
          {
            "from": 10.8,
            "to": 11.01
          },
          {
            "from": 11.01
          }
        ]
      },
      "aggs": {
        "stat_amount": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

//Date
GET orders/_search
{
  "size": 0,
  "aggs": {
    "purchase_ranges": {
      "date_range": {
        "field": "purchased_at",
        "format": "yyyy-MM-dd",
        "keyed": true, 
        "ranges": [
          {
            "from": "2016-01-01",
            "to": "2016-01-01||+6M",
            "key": "first_half"
          },
          {
            "from": "2016-01-01||+6M",
            "to": "2016-01-01||+1y",
            "key": "second_half"
          }
        ]
      },
      "aggs": {
        "stats": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

// Histogram
GET orders/_search
{
  "size": 0,
  "aggs": {
    "amount_distribution": {
      "histogram": {
        "field": "total_amount",
        "interval": 50,
        "extended_bounds": {
          "min": 0,
          "max": 500
        }
      }
    }
  }
}

// Histogram
GET orders/_search
{
  "aggs": {
    "order_over_time": {
      "date_histogram": {
        "field": "purchased_at",
        "calendar_interval": "month"
      }
    }
  }
}