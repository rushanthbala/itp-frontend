import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";

function JobTableSearch({ handleSearch, isLoading }) {
	const [jobId, setJobId] = useState("");

	const [lengthSelect, setLengthSelect] = useState("ignore");
	const [length, setLength] = useState("");
	const [lengthHasErr, setLengthHasErr] = useState(false);

	const [crewSelect, setCrewSelect] = useState("ignore");
	const [crew, setCrew] = useState("");
	const [crewHasErr, setCrewHasErr] = useState(false);

	const [revenueSelect, setRevenueSelect] = useState("ignore");
	const [revenue, setRevenue] = useState("");
	const [revenueHasErr, setRevenueHasErr] = useState(false);

	const [ratingSelect, setRatingSelect] = useState("ignore");
	const [rating, setRating] = useState("");
	const [ratingHasErr, setRatingHasErr] = useState(false);

	function handleSubmit() {
		let hasAnyErr = false;

		setLengthHasErr(false);
		if (length < 1 && lengthSelect !== "ignore") {
			setLengthHasErr(true);
			hasAnyErr = true;
		}

		setCrewHasErr(false);
		if (crew < 1 && crewSelect !== "ignore") {
			setCrewHasErr(true);
			hasAnyErr = true;
		}

		setRevenueHasErr(false);
		if (revenue < 1 && revenueSelect !== "ignore") {
			setRevenueHasErr(true);
			hasAnyErr = true;
		}

		setRatingHasErr(false);
		if (rating < 0 || (rating > 5 && ratingSelect !== "ignore")) {
			setRatingHasErr(true);
			hasAnyErr = true;
		}

		//Create and send SearchParams object to SchedListPage
		if (!hasAnyErr) {
			handleSearch({
				jobId,
				lengthSelect,
				length,
				crewSelect,
				crew,
				revenueSelect,
				revenue,
				ratingSelect,
				rating,
			});
		}
	}

	return (
		<div className="flex flex-col justify-center" style={{ height: "70vh" }}>
			<div
				className="pr-4 flex flex-col gap-3"
				style={{
					height: "90%",
					width: "100%",
				}}
			>
				<div className="flex gap-2 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Job Id</div>
					<div>
						<TextInput
							type="text"
							sizing="sm"
							placeholder="Type Job Id here..."
							value={jobId}
							onChange={(e) => setJobId(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Job Length</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									onChange={(e) => setLengthSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="lessThan">Less Than</option>
									<option value="greaterThan">Greater Than</option>
									<option value="equal">Equal</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Length" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="number"
										sizing="sm"
										disabled={lengthSelect === "" || isLoading}
										value={length}
										onChange={(e) => setLength(e.target.value)}
										color={lengthHasErr ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Crew Number</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									onChange={(e) => setCrewSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="lessThan">Less Than</option>
									<option value="greaterThan">Greater Than</option>
									<option value="equal">Equal</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Crew" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="number"
										sizing="sm"
										disabled={crewSelect === "" || isLoading}
										value={crew}
										onChange={(e) => setCrew(e.target.value)}
										color={crewHasErr ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Revenue</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									onChange={(e) => setRevenueSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="lessThan">Less Than</option>
									<option value="greaterThan">Greater Than</option>
									<option value="equal">Equal</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Rev" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="number"
										sizing="sm"
										disabled={revenueSelect === "" || isLoading}
										value={revenue}
										onChange={(e) => setRevenue(e.target.value)}
										color={revenueHasErr ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Rating</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									onChange={(e) => setRatingSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="lessThan">Less Than</option>
									<option value="greaterThan">Greater Than</option>
									<option value="equal">Equal</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Rating" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="number"
										max={5}
										sizing="sm"
										disabled={ratingSelect === "" || isLoading}
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										color={ratingHasErr ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-2 flex-col py-2 border-t">
				<Button
					size="sm"
					style={{ width: "100%" }}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex flex-row gap-2">
							Searching...
							<Spinner size="sm" />
						</div>
					) : (
						"Search"
					)}
				</Button>
			</div>
		</div>
	);
}

export default JobTableSearch;
