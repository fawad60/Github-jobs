import React, { useState } from "react";
import "./App.css";
import Fetchjobs from "./Fetchjobs";
import Grid from "@material-ui/core/Grid";

import Job from "./Job";

function App() {
  const [page, setpage] = useState(1);
  const [params, setparams] = useState({});
  const { jobs, loading, err } = Fetchjobs(params, page);
  console.log(jobs);
  return (
    <>
      {loading && <h1>loading</h1>}

      {err && <h1>err</h1>}
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ padding: "50px" }}
        spacing={5}
      >
        {jobs.map((job) => (
          <Grid key={job.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Job key={job.id} job={job} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default App;
