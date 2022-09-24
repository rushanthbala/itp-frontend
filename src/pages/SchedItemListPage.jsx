import axios from "axios";
import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Fragment } from "react";
import { Container, ScheduleItem, ScheduleSearch } from "../components";
import { useInfiniteScroll } from "../hooks";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function SchedItemListPage({ isDataUpdated, setIsDataUpdated }) {
	const [pgNum, setPgNum] = useState(0);
	const [searchSortParams, setSearchSortParams] = useState({});
	const pgSize = 20;

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		SCHEDULE_URL,
		searchSortParams,
		pgNum,
		pgSize
	);
	const observer = useRef();
	const lastScheduleRef = useCallback(
		(node) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPgNum((prevPgNum) => prevPgNum + 1);
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	useEffect(() => {
		if (!isDataUpdated) {
			let temp = searchSortParams;
			temp.isDataUpdated = true;
			setSearchSortParams(temp);
			setIsDataUpdated(true);
		}
	}, [isDataUpdated]);

	function handleEdit(scheduleDetails) {
		console.log("Schedule Edited! making axios put request!", scheduleDetails);
		axios
			.put(SCHEDULE_URL, scheduleDetails, {
				params: { id: scheduleDetails.id },
			})
			.then((response) => {
				console.log(response);
				setIsDataUpdated(false);
			});
	}

	function handleDelete(scheduleDetails) {
		console.log(
			"Schedule Deleted! making axios delete request!",
			scheduleDetails
		);
		axios
			.delete(SCHEDULE_URL, { params: { id: scheduleDetails.id } })
			.then((response) => {
				console.log(response);
				setIsDataUpdated(false);
			});
	}

	function handleSearch(s) {
		setSearchSortParams({ ...s, isDataUpdated });
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2 flex-row">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-2/6"
						>
							<ScheduleSearch handleSearch={handleSearch} />
						</Container>
						<div
							className="flex-grow flex flex-col border p-2 gap-2 rounded-md overflow-y-scroll w-3/4"
							style={{ height: "78vh" }}
						>
							{dataList.map((s, i) =>
								dataList.length - 1 === i ? (
									<ScheduleItem
										key={i}
										itemRef={lastScheduleRef}
										handleEdit={handleEdit}
										handleDelete={handleDelete}
										scheduleDetails={s}
									/>
								) : (
									<ScheduleItem
										key={i}
										handleEdit={handleEdit}
										handleDelete={handleDelete}
										scheduleDetails={s}
									/>
								)
							)}
						</div>
					</div>
				</Container>
			</div>
		</Fragment>
	);
}

export default SchedItemListPage;