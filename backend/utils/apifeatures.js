class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            }
          : {};
          this.query = this.query.find({ ...keyword });
          return this;
        }

        filter() {
            // this.queryStr is passed with reference otherwise there will be more error
            // queryStr is object if write this.queryStr than it will also change the value of 
            // constructor
            const queryCopy = { ...this.queryStr };
            // console.log(queryCopy);
            //   Removing some fields for category
            // skip those 3  keywords in search
            const removeFields = ["keyword", "page", "limit"];
        
            removeFields.forEach((key) => delete queryCopy[key]);
            // console.log(queryCopy);

            // Filter for Price and Rating
            // gt = 1200 and lt = 2000
            // $ for mongo db 
            let queryStr = JSON.stringify(queryCopy);
            // gt = greater than 
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
            this.query = this.query.find(JSON.parse(queryStr));
            return this;
        }

        pagination(resultPerPage) {
            const currentPage = Number(this.queryStr.page) || 1; //50 products - 10 products per page 
        
            const skip = resultPerPage * (currentPage - 1); // 10 * (current page 2 - 1) 2 page means 1 page * 10 
            // that means you need to skip 10 products
        
            this.query = this.query.limit(resultPerPage).skip(skip);//limit = parameter of pagination and skip means skip product
        
            return this;
          }
        
}


module.exports = ApiFeatures