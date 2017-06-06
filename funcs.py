def plotTripEx(df) :
    import folium
    import matplotlib.cm as cm
    map_trip = folium.Map(location=[df.iloc[0]['LATITUDE'],df.iloc[0]['LONGITUDE']], zoom_start=14)

    for CLR, SPD, LAT, LON in zip(df.colorStr, df.OBD_SPEED, df.LATITUDE, df.LONGITUDE):
        folium.CircleMarker([LAT, LON], 
                        popup = str(SPD), #text
                        radius = 6,fill_color=CLR).add_to(map_trip)

    return map_trip