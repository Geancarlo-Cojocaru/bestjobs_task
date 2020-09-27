// if it's not available anymore, replace this url with the path to json from github repo
let endpoint = 'http://api.jsoneditoronline.org/v1/docs/ab96152936154156bfee42502f38a4da';
let dataContainer = [];

let jobList = document.getElementById('jobList');
let listEnd = document.getElementById('listEnd');
let loadMoreJobs = document.getElementById('loadMoreJobs');

let jobListCount = 0;
let jobsToAdd = 16;
let appending = false;


// get json data with ajax
// then put it in data container
$.ajax({
	method : 'GET',
  url: endpoint,
  contentType: "application/json",
  dataType: 'json',
  success: function(result) {
		dataContainer = JSON.parse(result.data);
  }
});


// add jobs to listing
// iterate through dataContainer array
// get the data for each job by index (jobID)
function addJobs() {
	// stopp adding jobs
	if(jobListCount == dataContainer.length) return;

	appending = true;	
	let jobID = jobListCount;

	for (let i = jobListCount; i < jobsToAdd + jobListCount; i++) {		
		let item = generateDataBlock(dataContainer[jobID]);
		jobList.appendChild(item);
		jobID++;
	}

	appending = false;
	jobListCount += jobsToAdd;

	// to make things pretty we temporary hide the "load more" button in page
	// but remove class "invisible" from "listEnd" when we're done appending
	if (jobListCount + jobsToAdd == dataContainer.length) {
		setTimeout(listEnd.classList.remove('invisible'), 2500);
	}
}



// create job block
function generateDataBlock(data) {
	let item = document.createElement('div');
	item.setAttribute('class', 'col-sm-6 col-md-4 col-lg-3');
	item.innerHTML = `
		<div class="card-job">
      <div class="job-info">
        <h2 class="display-2"><a class="link-job" href="#">${data.title}</a></h2>
        <div class="employer">
          <h3 class="display-4 ellipsis-base">@ <a class="link-title text-underline" href="#">${data.employer}</a></h3>
          
          ${data.employerRating || data.responsive ? `
	          <div class="employer-data">
	          	${data.employerRating ? `
		            <div class="element">
		              <div class="rating">
		                <div class="empty d-inline-block"><i class="far fa-star text-warning"></i><i class="far fa-star text-warning"></i><i class="far fa-star text-warning"></i><i class="far fa-star text-warning"></i><i class="far fa-star text-warning"></i>
		                </div>
		                <div class="filled d-inline-block" style="width:${data.employerRating * 20}%"><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
		                </div>
		              </div>
		              <span>${data.employerRating}</span>
		            </div>` : ``}
	            ${data.responsive ? `<div class="element"><i class="fas fa-redo-alt text-secondary"></i> <span>Responsive</span></div>` : ``}
	          </div>` : ``}

          ${data.wage ? `<div class="display-3 text-headings">${data.wage} €</div>` : ``}
          <div class="locations ellipsis-base">in ${data.location}</div>
        </div>
      </div>
      <div class="job-extra">
        <div class="employer-logo"><a class="img-fit" href="#"><img src="${data.employerLogo[0]}" srcset="${data.employerLogo[1]} 60w, ${data.employerLogo[0]} 140w" sizes="(max-width: 600px) 60px, 100vw" alt="Adobe Romania"></a></div>
        <div class="actions"><a class="extra-actions" href="#" data-toggle="tooltip" data-placement="top" title="Share job"><i class="fas fa-share-alt"></i></a> <a class="extra-actions" href="#" data-toggle="tooltip" data-placement="top" title="Like job"><i class="fas fa-heart"></i></a><a class="btn btn-sm btn-primary btn-details" href="#">Job details</a></div>
      </div>
    </div>
	`;
	return item;
}


// options for intersection observer
let jobObserverOptions = {
	root: null,
	rootMargin: '0px',
	threshold: .1
}

// callback for intersection observer
let jobObserverCallback = (entries, jobListObserver) =>	{
	entries.forEach(entry => {
		if (entry.target.id === 'listEnd') {
			if (entry.isIntersecting && !appending) {
				appending = true;
				addJobs();
			}
		}
	}
)};

// intersection observer
let jobListObserver = new IntersectionObserver(jobObserverCallback, jobObserverOptions);

// call intersection observer if the element is on page
if (listEnd) {
	jobListObserver.observe(listEnd);
}


// restart the cycle on button click
if (loadMoreJobs) {
	loadMoreJobs.addEventListener('click', restartAddJobs);
}

function restartAddJobs() {
	jobListCount = 0;
	addJobs();
	listEnd.classList.add('invisible');
	loadMoreJobs.blur();
}